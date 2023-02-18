import React from 'react'
import { 
  TabPanel, 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer, 
} from '@chakra-ui/react'
import Collectible from '../Collectible/Collectible'
import { 
  toMonthName,
  monthArray,
  // getCurrentMonth,
 } from '../../utils'
import S from './Panel.style'

const Panel = ({ 
  category,
  tabIndex,
  visibilityData,
  userData,
  setUserData,
  month,
  filters,
}) => {

  const { showLocation, showSpeed, showSize, showTime } = visibilityData
  const maxWidth = category.categoryName === 'fossils' ? '350' : '100%'

  let counts = {
    fish: 0,
    bugs: 0,
    seaCreatures: 0,
    fossils: 0
  }

  let shownCounts = {
    fish: 0,
    bugs: 0,
    seaCreatures: 0,
    fossils: 0
  }

	return (
		<TabPanel className="tab-panel">
      <TableContainer>
        <Table variant='simple' maxWidth={maxWidth}>
          <Thead>
            <Tr className="table-headers">
              <Th textAlign='center'>Name</Th>
              {showLocation && <Th>Location</Th>}
              {showSpeed && <Th>Speed</Th>}
              {showSize && <Th>Size</Th>}
              {showTime && <Th>Time</Th>}
              <Th>Price</Th>
              {tabIndex !== 3 && 
                <>
                  {monthArray && monthArray.map((month) => {
                    return <Th className='monthCol' textAlign='center'>{toMonthName(month).abbr}</Th>
                  })}
                </>
              }
              {/*tabIndex === 3 ? (
                <Th>Available In {getCurrentMonth().name}</Th>
              ) : (
                <>
                {monthArray && monthArray.map((month) => {
                  return <Th className='monthCol'>{toMonthName(month).abbr}</Th>
                })}
                </>
              )*/}
            </Tr>
          </Thead>
          <Tbody>
          {category.data && 
              Object.keys(category.data).map((item) => {
                // increase total count
                counts[category.categoryName]++;

                // init data shorthand
                const itemData = category.data[item]
                const availableMonths = itemData.availability?.['month-array-northern']
                const { availMonth, comingMonth, goingMonth } = filters

                let showByMonth = true

                if (availMonth !== '') {
                  // if available month is selected, check for match
                  showByMonth = availableMonths?.indexOf(parseInt(availMonth)) > -1
                } else if (comingMonth !== '') {
                  // if coming month is selected, check for match this month and prev month no match
                  const prevMonth = (parseInt(comingMonth) === 1 ? 12 : parseInt(comingMonth) -1)
                  showByMonth = availableMonths?.indexOf(parseInt(comingMonth)) > -1 && availableMonths?.indexOf(parseInt(prevMonth)) === -1
                } else if (goingMonth !== '') {
                  // if going month is selected, check for match this month and next month no match
                  const nextMonth = (parseInt(goingMonth) === 12 ? 1 : parseInt(goingMonth) + 1)
                  showByMonth = availableMonths?.indexOf(parseInt(goingMonth)) > -1 && availableMonths?.indexOf(parseInt(nextMonth)) === -1
                  // console.log(`info for ${item} - goingMonth: ${goingMonth}, nextMonth: ${nextMonth}`)
                  // console.log(`*** show ${item} leaving after month: ${showByMonth}`)
                }

                // set isFossil to true if this is a fossil
                const isFossil = category.categoryName === 'fossils'
                // console.log(`*** isFossil for ${item}: ${isFossil}`)

                // showCollectible is true if we're showing by month or it's a fossil
                const showCollectible = showByMonth || isFossil

                // console.log(`*** showCollectible for ${item}: ${showCollectible}`)

                if (showCollectible) {
                  shownCounts[category.categoryName]++
                }

                return (
                  <>
                  {showCollectible && 
                    <Collectible 
                      tabIndex={tabIndex} 
                      displayName={category.displayName} 
                      category={category.categoryName}
                      itemName={item} 
                      itemData={itemData}
                      visibilityData={visibilityData}
                      userData={userData}
                      setUserData={setUserData}
                    />
                  }
                  </>
                )})
            }
            {shownCounts[category.categoryName] === 0 && 
              <S.NoResults>No Results</S.NoResults>
            }
            {/*<div>Total count {category.categoryName}: {counts[category.categoryName]}</div>
            <div>Total shown {category.categoryName}: {shownCounts[category.categoryName]}</div>*/}
          </Tbody>
        </Table>
      </TableContainer>
    </TabPanel>
	)
}

export default Panel