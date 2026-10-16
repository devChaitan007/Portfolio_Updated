import { site } from "@/data/site";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <h2>Got raw footage?</h2>
        <p className="lead">Send the clip and where it will be posted.</p>
        <a className="mail" href={`mailto:${site.email}`}>{site.email}</a>
        <p className="foot">{site.phone}. {site.location}. © 2026 {site.name}.</p>
      </div>
    </section>
  );
}
