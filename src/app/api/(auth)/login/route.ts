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
