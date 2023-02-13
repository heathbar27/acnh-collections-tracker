import React, { useEffect, useState } from 'react'
import { 
  TabPanel, 
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, 
} from '@chakra-ui/react'
import Collectible from '../Collectible/Collectible'
import { 
  toMonthName,
  splitToParagraphs, 
  monthArray,
  getCurrentMonth,
 } from '../../utils'
import S from './Panel.style'

const Panel = ({ 
  category,
  tabIndex,
  visibilityData,
}) => {

  const { showLocation, showSpeed, showSize, showTime } = visibilityData

	return (
		<TabPanel className="tab-panel">
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr className="table-headers">
              <Th textAlign='center'>Name</Th>
              {showLocation && <Th>Location</Th>}
              {showSpeed && <Th>Speed</Th>}
              {showSize && <Th>Size</Th>}
              {showTime && <Th>Time</Th>}
              <Th>Price</Th>
              {tabIndex === 3 ? (
                <Th>Available In {getCurrentMonth().name}</Th>
              ) : (
                <>
                {monthArray && monthArray.map((month) => {
                  return <Th className='monthCol'>{toMonthName(month).abbr}</Th>
                })}
                </>
              )}
            </Tr>
          </Thead>
          <Tbody>
          {category.data && 
              Object.keys(category.data).map((item) => 
                <Collectible 
                  tabIndex={tabIndex} 
                  category={category.displayName} 
                  itemName={item} 
                  itemData={category.data[item]}
                  visibilityData={{
                    showLocation,
                    showSpeed,
                    showSize,
                    showTime,
                  }}
                />
              )
            }
          </Tbody>
        </Table>
      </TableContainer>
    </TabPanel>
	)
}

export default Panel