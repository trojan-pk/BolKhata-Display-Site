import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Demo from "@/components/Demo";
import Section from "@/components/Section";
import Steps from "@/components/Steps";
import Capabilities from "@/components/Capabilities";
import DayBook from "@/components/DayBook";
import Oversight from "@/components/Oversight";
import Access from "@/components/Access";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

/** A section's own heading. Kept here so the page reads as an outline. */
function Heading({
  title,
  lead,
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
}) {
  return (
    <Reveal className="mb-[clamp(2rem,1rem+2.5vw,3rem)]">
      <h2 className={lead ? "mb-4" : ""}>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Demo />

        <Section id="how" label="Method" bordered={false}>
          <Heading
            title="Three steps, and one of them is yours."
            lead="Entries go missing at the counter, not at the desk — recording them interrupts the sale. BolKhata asks for the sentence you were going to say anyway and handles the rest."
          />
          <Steps />
        </Section>

        <Section id="scope" label="Scope" tone="deep">
          <Heading
            title="What it handles."
            lead="The day-to-day work of keeping a small trading business straight."
          />
          <Capabilities />
        </Section>

        <Section id="record" label="The record">
          <Heading
            title="A day, reconciled."
            lead="Every entry below came from a spoken sentence, except the rent — a standing instruction the agent posts on its own. Opening balance plus money in, less money out, lands exactly on the closing figure."
          />
          <Reveal>
            <DayBook />
          </Reveal>
        </Section>

        <Section id="oversight" label="Oversight" tone="deep">
          <Heading
            title="An agent you can audit."
            lead="An agent writing to your books is only acceptable if you can see what it did, correct it, and take the whole record elsewhere. All three are built in."
          />
          <Oversight />
        </Section>

        <Section id="access" label="Early access">
          <Access />
        </Section>
      </main>

      <Footer />
    </>
  );
}
