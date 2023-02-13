import React, { useEffect, useState } from 'react'
import { 
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { 
  toMonthName,
  splitToParagraphs, 
  monthArray,
  getShadowName,
 } from '../../utils'
import S from './Collectible.style'

const Collectible = ({
  tabIndex,
  category,
  itemName,
  itemData,
  visibilityData,
}) => {

    const [showMonth, setShowMonth] = useState(0)

    const { showLocation, showSpeed, showSize, showTime } = visibilityData

    const isFossil = category === 'Fossils'
    const isAvailable = itemData.availability?.['month-array-northern'].indexOf(2) > -1 || isFossil || showMonth === 0
    const shadowName = getShadowName(itemData.shadow)

    console.log('******** shadowName', shadowName)

    return (
      <>
      {isAvailable ? (
        <Tr className="collectible">
          <Td className='name' textAlign="center">
            <img src={isFossil ? itemData.image_uri : itemData.icon_uri} className='icon' width='45'/>
            {itemName.split('_').join(' ')}
            <S.ButtonContainer>
              <button>DETAILS</button>
              <button>DONATED</button>
            </S.ButtonContainer>
          </Td>
          {showLocation &&
            <Td className='location'>
              {itemData.availability?.location 
                ? splitToParagraphs(itemData.availability?.location) 
                : 'N/A'
              }
            </Td>
          }
          {showSpeed && <Td>speed</Td>}
          {showSize && <Td>{shadowName}</Td>}
          {showTime && 
            <Td className='time'>
              {itemData.availability?.isAllDay || isFossil
                ? 'All Day' 
                : splitToParagraphs(itemData.availability?.time)
              }
            </Td>
          }
          <Td className='price'>
            {itemData.price.toLocaleString('en-US')}
          </Td>
          {tabIndex !== 3 && monthArray && monthArray.map((month) => 
            itemData.availability?.['month-array-northern'].indexOf(month) > -1
              ? <Td className='avail'></Td>
              : <Td className='unavail'></Td>
            )
          }
        </Tr>
      ) : (
        <></>
      )}
      </>
    )
}

export default Collectible