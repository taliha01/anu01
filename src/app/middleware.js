import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

 
  if (pathname === "/profile") {
   
    const isAuthenticated = request.cookies.get("loggedIn") === "true";

    
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  
  return NextResponse.next();
}


export const config = {
  matcher: ["/profile"],
};
