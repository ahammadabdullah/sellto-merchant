import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        // Mock delay to simulate processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        return NextResponse.json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
