import Section from '../ui/Section'
import EntryList from '../ui/EntryList'
import { useContent } from '../../content'

export default function Trainings() {
  const { trainings } = useContent()
  return (
    <Section id="trainings" index="05" label="TRAININGS" title="Pelatihan & Sertifikasi"  variant="grid">
      <EntryList items={trainings} />
    </Section>
  )
}