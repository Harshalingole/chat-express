
import { supabase } from "../../../../../lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    NextResponse.json(
      { message: `Method ${req.method} Not Allowed` },
      { status: 405 }
    );
    return;
  }

  const { username, password } = await req.json();
  const email = `${username}@gmail.com`;

  // Supabase auth signup to manage session with email and password
  const { data: authUser, error: authError } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (authError) {
    console.log("authError", authError);
    return NextResponse.json(
      { message: authError.message },
      { status: authError.status }
    );
  }

  ``;
  return NextResponse.json({ message: "Register Successfully ! Now login with Register detail", user: authUser.user });

}
