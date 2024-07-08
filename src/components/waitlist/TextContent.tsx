export interface classProps {
  className?: string;
}
export default function Component({ className }: classProps) {
  return (
    <>
      <h1 className="sm:text-6xl text-5xl font-clash font-medium">
        <span className="text-primary2">Your one stop</span>
        <br />
        digital store solution<span className="text-primary2">.</span>
      </h1>
      <p className="max-w-[580px] opacity-75">
        Sellto is an all-in-one platform to start, run, and grow a digital
        business from software to communities and everything else.
      </p>
    </>
  );
}
