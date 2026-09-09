"use server";

export async function saveContact(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);
}
