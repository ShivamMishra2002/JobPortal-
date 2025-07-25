import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from '@radix-ui/react-label'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Banglore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Science"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1lack", "1lack to 3lack", "3lack to 5lack"]
  },
]

const FilterCard = () => {
  return (
    <div className="p-4 border rounded-md shadow-sm w-full max-w-sm">
      <h1 className="text-xl font-bold">Filter Jobs</h1>
      <hr className='my-3' />

      {filterData.map((data, index) => (
        <div key={index} className="mb-5">
          <h2 className="text-md font-semibold mb-2">{data.filterType}</h2>
          <RadioGroup>
            {data.array.map((item, i) => (
              <div key={i} className="flex items-center space-x-2 mb-1">
                <RadioGroupItem value={item} id={`${data.filterType}-${item}`} />
                <Label htmlFor={`${data.filterType}-${item}`}>{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}

export default FilterCard
