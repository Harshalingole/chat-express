import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "../../../../../utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    NextResponse.json(
      { message: `Method ${req.method} Not Allowed` },
      { status: 405 }
    );
    return;
  }

  const supabase = createClient();

  const { username, password } = await req.json();
  console.log("POST LOGIN:", username, password);
  const email = `${username}@gmail.com`
  // Fetch the user id associated with the username from app_users table
  // const { data: appUser, error: appUserError } = await supabase
  //   .from("app_users")
  //   .select("id")
  //   .eq("username", username)
  //   .single();

  // if (appUserError) {
  //   console.log("appUserError",appUserError)
  //   return NextResponse.json(
  //     { message: appUserError.message },
  //     { status: 401 }
  //   );
  // }

  // Fetch the email associated with the user id to make login request with Supabase
  // const { data: user, error: userError } = await supabase
  //   .from("auth.users")
  //   .select("email")
  //   .eq("id", appUser.id)
  //   .single();

  // if (userError || !user) {
  //   console.log("userError",userError)
  //   return NextResponse.json({ message: userError.message}, { status: 401 });
  // }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log("signInWithPassword eror",error)
    return NextResponse.json({ message: `${error.message}` }, { status: 401 });
  }

  return NextResponse.json({ message: "Login successful", user: data.user });
}
