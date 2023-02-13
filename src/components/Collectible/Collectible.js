import React, { useState } from 'react'
import { 
  Tr,
  Td,
} from '@chakra-ui/react'
import { 
  splitToParagraphs, 
  monthArray,
  getShadowName,
 } from '../../utils'
import S from './Collectible.style'

const Collectible = ({
  tabIndex,
  displayName,
  category,
  itemName,
  itemData,
  visibilityData,
  userData,
  setUserData,
}) => {

    const { showLocation, showSpeed, showSize, showTime } = visibilityData

    const isFossil = category === 'fossils'
//    const isAvailable = itemData.availability?.['month-array-northern'].indexOf(2) > -1 || isFossil
    const isAvailable = true

    const data = {...userData}
    const [isDonated, setIsDonated] = useState(data[category].indexOf(itemName) > -1)

    const collectibleName = itemName.split('_').join(' ')
    const shadowName = getShadowName(itemData.shadow)

    const handleDonationClick = () => {
      // put it into a changeable thing

      // console.log('***** handleDonationClick', category)
      // console.log('**** clicked thing', itemName)
      // console.log('**** thing to check: ', data[category])

      if (!isDonated) {
//        console.log('**** donating: ', itemName)
        data[category].push(itemName)
//         console.log('**** data after', data)
        setUserData(data)
        setIsDonated(true)
      } else {
//        console.log('**** already donated: ', itemName)
      }
   }

   const handleUndonationClick = () => {
//      console.log('***** handle undonate')
      if (isDonated) {
        const index = data[category].indexOf(itemName)
//        console.log('***** index', index)
        if (index > -1) {
          data[category].splice(index, 1)
          setUserData(data)
          setIsDonated(false)
        }
      }
   }

    return (
      <>
      {isAvailable ? (
        <Tr className={`${isDonated ? 'collectible donated' : 'collectible'}`}>
          <Td className='name' textAlign="center">
            <img src={isFossil ? itemData.image_uri : itemData.icon_uri} alt={collectibleName} className='icon' width='45'/>
            {collectibleName}
            <S.ButtonContainer>
              <button disabled style={{'pointer-events':'none', 'background': '#dddddd', 'color':'#bbbbbb'}}>DETAILS</button>
              {isDonated ? (
                  <button onClick={handleUndonationClick}>UNDO DONATE</button>
                ) : (
                  <button onClick={handleDonationClick}>DONATED IT!</button>
                )}
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