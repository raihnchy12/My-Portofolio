import Section from '../ui/Section'
import EntryList from '../ui/EntryList'
import { useContent } from '../../content'

export default function Awards() {
  const { awards } = useContent()
  return (
    <Section id="awards" index="04" label="AWARDS" title="Penghargaan"  variant="waves">
      <EntryList items={awards} />
    </Section>
  )
}