import React from 'react'
import { 
  TabPanel, 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer, 
} from '@chakra-ui/react'
import Collectible from '../Collectible/Collectible'
import { 
  toMonthName,
  monthArray,
  getCurrentMonth,
 } from '../../utils'
//import S from './Panel.style'

const Panel = ({ 
  category,
  tabIndex,
  visibilityData,
  userData,
  setUserData,
  month,
}) => {

  const { showLocation, showSpeed, showSize, showTime } = visibilityData
  const maxWidth = category.categoryName === 'fossils' ? '350' : '100%'

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
                    return <Th className='monthCol'>{toMonthName(month).abbr}</Th>
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
                const itemData = category.data[item]
                const showCollectible = 
                  category.categoryName === 'fossils' || 
                  month === '' || 
                  itemData.availability?.['month-array-northern'].indexOf(parseInt(month)) > -1

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
          </Tbody>
        </Table>
      </TableContainer>
    </TabPanel>
	)
}

export default Panel