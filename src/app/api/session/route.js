import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";

export async function GET(){
  const session = await getServerSession(authOptions);
  return NextResponse.json({
    authenticated: !!session,
    session
  })
}