import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import Select from 'react-select'

const CustomSelect = ({ setName }) => {
  const resultAuthors = useQuery(ALL_AUTHORS)

  const selectStyle = {
    width: '100%',
    maxWidth: 600,
  }

  if (resultAuthors.loading) {
    return <div>loading...</div>
  }

  const authors = resultAuthors.data.allAuthors

  const options = authors.map((a) => ({ value: a.name, label: a.name }))

  const onChangeInput = (input) => {
    setName(input.value)
  }

  return (
    <Select options={options} style={selectStyle} onChange={onChangeInput} />
  )
}

export default CustomSelect
