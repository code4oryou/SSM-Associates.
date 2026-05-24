export function BackgroundElements() {
    return (
        <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none">

            {/* 1. The Top-Down Wash */}
            {/* A very soft linear gradient that pulls the eye downward */}
            <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-primary/5 via-primary/[0.02] to-transparent dark:from-primary/10 dark:via-primary/[0.05] dark:to-transparent" />

            {/* 2. The Center Spotlight */}
            {/* A massive, ultra-diffused radial glow right behind the main text */}
            <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-primary/10 dark:bg-primary/20 blur-[140px] rounded-full" />

        </div>
    );
}