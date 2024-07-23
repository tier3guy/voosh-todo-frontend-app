import { NextResponse, type NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
    const isAuthRoute = request.url.includes("auth");

    const cookieName = process.env.COOKIE_NAME!;
    const token = request.cookies.get(cookieName);

    if (!token && !isAuthRoute) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
}

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
