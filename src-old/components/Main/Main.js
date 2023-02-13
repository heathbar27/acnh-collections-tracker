import React, { useEffect, useState } from 'react'
import { 
  Input,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
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
import Panel from '../Panel/Panel'
import { 
  categories,
  toMonthName,
  splitToParagraphs, 
  monthArray,
  getCurrentMonth,
 } from '../../utils'
import S from './Main.style'

const Main = () => {

	const [fishData, setFishData] = useState(null)
	const [bugData, setBugData] = useState(null)
	const [seaCreatureData, setSeaCreatureData] = useState(null)
	const [fossilData, setFossilData] = useState(null)

	const [tabIndex, setTabIndex] = useState(0)
	const [visibilityData, setVisibilityData] = useState({
		showLocation: true,
		showSpeed: true,
		showSize: true,
		showTime: true,
	})

	const categories = [
		{ 
			displayName: 'Fish',
			data: fishData,		
		},
		{
			displayName: 'Bugs',
			data: bugData,
		},
		{
			displayName: 'Sea Creatures',
			data: seaCreatureData,
		},
		{
			displayName: 'Fossils',
			data: fossilData,
		},
	]

	useEffect(() => {
	  fetch("https://acnhapi.com/v1/fish")
        .then(res => res.json())
        .then(
          (result) => {
            setFishData(result)
          },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        	alert('there was an error with fish!')
        }
      )
	  fetch("https://acnhapi.com/v1/bugs")
        .then(res => res.json())
        .then(
          (result) => {
            setBugData(result)
          },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        	alert('there was an error with bugs!')
        }
      )
	  fetch("https://acnhapi.com/v1/sea")
        .then(res => res.json())
        .then(
          (result) => {
            setSeaCreatureData(result)
          },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        	alert('there was an error with sea creatures!')
        }
      )
	  fetch("https://acnhapi.com/v1/fossils")
        .then(res => res.json())
        .then(
          (result) => {
            setFossilData(result)
          },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        	alert('there was an error with fossils!')
        }
      )
  	}, [])

  	useEffect(() => {
      if (fishData && bugData && seaCreatureData && fossilData) {
      	console.log('**** fishData', fishData)
      	console.log('**** bugData', bugData)
      	console.log('**** seaCreatureData', seaCreatureData)
      	console.log('**** fossilData', fossilData)
      }
  	}, [fishData, bugData, seaCreatureData, fossilData])

  	useEffect(() => {
  		console.log('***** tabIndex', tabIndex)
  		switch(tabIndex){
  			case 0:
  				setVisibilityData({
  					showLocation: true,
  					showSpeed: false,
  					showSize: true,
  					showTime: true,
  				})
  				break;
  			case 1:
  				setVisibilityData({
  					showLocation: true,
  					showSpeed: false,
  					showSize: false,
  					showTime: true,
  				})
  				break;
  			case 2:
  				setVisibilityData({
  					showLocation: false,
  					showSpeed: true,
  					showSize: true,
  					showTime: true,
  				})
  				break;
  			case 3:
  				setVisibilityData({
  					showLocation: false,
  					showSpeed: false,
  					showSize: false,
  					showTime: false,
  				})
  				break;
  			default:
  				setVisibilityData({
  					showLocation: true,
  					showSpeed: true,
  					showSize: true,
  					showTime: true,
  				})
  				break;
  		}
  	}, [tabIndex])


	return (
		<S.MainLayout>
		<Tabs onChange={(index) => setTabIndex(index)}>
			<TabList className="tabs">
				{categories.map((category) => <Tab>{category.displayName}</Tab>)}
			</TabList>
			<TabPanels>
				{categories.map((category) => (
					<Panel category={category} tabIndex={tabIndex} visibilityData={visibilityData}/>
				))}
			</TabPanels>
		</Tabs>
		</S.MainLayout>
	)
}

export default Main