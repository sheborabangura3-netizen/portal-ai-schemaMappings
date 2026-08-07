import { redirect } from "next/navigation";

// middleware.ts has already gated this — by the time we're here there's
// a valid session, so this is just a landing redirect, not a real page.
export default function RootPage() {
  redirect("/queue");
}
