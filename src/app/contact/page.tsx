import { saveContact } from "./actions";

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Form</h1>

      <form action={saveContact}>
        <input type="text" name="name" placeholder="Enter your name" />

        <input type="email" name="email" placeholder="Enter your email" />

        <textarea name="message" placeholder="Enter your message" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
