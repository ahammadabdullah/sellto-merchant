import { startOfWeek, endOfWeek, subWeeks } from "date-fns";
import prisma from "@/lib/db";

type DashboardStatistics = {
  totalRevenue: {
    thisWeek: number;
    lastWeek: number;
    growth: number;
  };
  totalOrders: {
    thisWeek: number;
    lastWeek: number;
    growth: number;
  };
  averageOrderValue: {
    thisWeek: number;
    lastWeek: number;
    growth: number;
  };
  totalTickets: {
    allTime: number;
    openTicketsAllTime: number;
  };
};

export async function getDashboardStatistics(
  shopId: string
): Promise<DashboardStatistics> {
  const currentDate = new Date();

  const startOfCurrentWeek = startOfWeek(currentDate);
  const endOfCurrentWeek = endOfWeek(currentDate);
  const startOfLastWeek = startOfWeek(subWeeks(currentDate, 1));
  const endOfLastWeek = endOfWeek(subWeeks(currentDate, 1));

  // Fetch total revenue for this week and last week
  const totalRevenueThisWeek = await prisma.order.aggregate({
    _sum: {
      revenue: true,
    },
    where: {
      shopId,
      createdAt: {
        gte: startOfCurrentWeek,
        lte: endOfCurrentWeek,
      },
    },
  });

  const totalRevenueLastWeek = await prisma.order.aggregate({
    _sum: {
      revenue: true,
    },
    where: {
      shopId,
      createdAt: {
        gte: startOfLastWeek,
        lte: endOfLastWeek,
      },
    },
  });

  const revenueGrowth = calculateGrowth(
    totalRevenueThisWeek._sum.revenue || 0,
    totalRevenueLastWeek._sum.revenue || 0
  );

  const totalOrdersThisWeek = await prisma.order.count({
    where: {
      shopId,
      createdAt: {
        gte: startOfCurrentWeek,
        lte: endOfCurrentWeek,
      },
    },
  });

  const totalOrdersLastWeek = await prisma.order.count({
    where: {
      shopId,
      createdAt: {
        gte: startOfLastWeek,
        lte: endOfLastWeek,
      },
    },
  });

  const ordersGrowth = calculateGrowth(
    totalOrdersThisWeek,
    totalOrdersLastWeek
  );

  const totalTicketsAllTime = await prisma.ticket.count({
    where: {
      shopId,
    },
  });

  const totalOpenTicketsAllTime = await prisma.ticket.count({
    where: {
      shopId,
      status: "open",
    },
  });

  const AOVThisWeek = totalOrdersThisWeek
    ? (totalRevenueThisWeek._sum.revenue ?? 0) / totalOrdersThisWeek
    : 0;
  const AOVLastWeek = totalOrdersLastWeek
    ? (totalRevenueLastWeek._sum.revenue ?? 0) / totalOrdersLastWeek
    : 0;

  const AOVGrowth = calculateGrowth(AOVThisWeek, AOVLastWeek);

  return {
    totalRevenue: {
      thisWeek: totalRevenueThisWeek._sum.revenue || 0,
      lastWeek: totalRevenueLastWeek._sum.revenue || 0,
      growth: revenueGrowth,
    },
    totalOrders: {
      thisWeek: totalOrdersThisWeek,
      lastWeek: totalOrdersLastWeek,
      growth: ordersGrowth,
    },
    averageOrderValue: {
      thisWeek: AOVThisWeek,
      lastWeek: AOVLastWeek,
      growth: AOVGrowth,
    },
    totalTickets: {
      allTime: totalTicketsAllTime,
      openTicketsAllTime: totalOpenTicketsAllTime,
    },
  };
}

function calculateGrowth(currentValue: number, previousValue: number): number {
  if (previousValue === 0) return currentValue > 0 ? 100 : -100;
  return ((currentValue - previousValue) / previousValue) * 100;
}

type ChartData = {
  Xtitle: string;
  revenue: number;
  orders: number;
};

export async function getChartData(): Promise<ChartData[]> {
  const now = new Date();
  const months = [];

  for (let i = 0; i < 6; i++) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.unshift({
      month: monthDate.getMonth(),
      year: monthDate.getFullYear(),
      Xtitle: monthDate.toLocaleString("default", { month: "long" }),
    });
  }

  const startDate = new Date(months[0].year, months[0].month, 1);
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const groupedData = await prisma.order.groupBy({
    by: ["createdAt"],
    _sum: {
      revenue: true,
    },
    _count: {
      id: true,
    },
    where: {
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
  });

  const monthMap = groupedData.reduce((acc, item) => {
    const date = new Date(item.createdAt);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

    if (!acc[monthKey]) {
      acc[monthKey] = { revenue: 0, orders: 0 };
    }

    acc[monthKey].revenue += item._sum.revenue || 0;
    acc[monthKey].orders += item._count.id || 0;

    return acc;
  }, {} as Record<string, { revenue: number; orders: number }>);

  const chartData = months.map((month) => {
    const key = `${month.year}-${month.month}`;
    const data = monthMap[key] || { revenue: 0, orders: 0 };

    return {
      Xtitle: month.Xtitle,
      revenue: data.revenue,
      orders: data.orders,
    };
  });

  return chartData;
}
