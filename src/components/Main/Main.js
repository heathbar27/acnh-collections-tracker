import React, { useEffect, useState } from 'react'
import { 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
} from '@chakra-ui/react'
import Panel from '../Panel/Panel'
import S from './Main.style'

const Main = () => {

	const [fishData, setFishData] = useState(null)
	const [bugData, setBugData] = useState(null)
	const [seaCreatureData, setSeaCreatureData] = useState(null)
	const [fossilData, setFossilData] = useState(null)
  const [visibilityData, setVisibilityData] = useState({
    showLocation: true,
    showSpeed: true,
    showSize: true,
    showTime: true,
  })

  const [userData, setUserData] = useState(null)

	const [tabIndex, setTabIndex] = useState(0)

	const categories = [
		{ 
			displayName: 'Fish',
      categoryName: 'fish',
			data: fishData,		
		},
		{
			displayName: 'Bugs',
      categoryName: 'bugs',
			data: bugData,
		},
		{
			displayName: 'Sea Creatures',
      categoryName: 'seaCreatures',
			data: seaCreatureData,
		},
		{
			displayName: 'Fossils',
      categoryName: 'fossils',
			data: fossilData,
		},
	]

  // Load from localstorage 
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('acnh-data'))

    if (!data) {
      // alert('No user! Setting default data.')

      localStorage.setItem('acnh-data', JSON.stringify({
        fish: [], 
        bugs: [], 
        seaCreatures: [], 
        fossils: [] 
      }))
    } else {
      setUserData(data)
    }
  }, [])

  useEffect(() => {
    if (userData) {
//      console.log('*** current userData', userData)
      localStorage.setItem('acnh-data', JSON.stringify(userData))
//      console.log('*** read data: ', JSON.parse(localStorage.getItem('acnh-data')))
    }
  }, [userData])

      // localStorage.setItem('acnh-data', JSON.stringify({
      //   'Heather': { 
      //     fish: ['bitterling'], 
      //     bugs: ['tarantula'], 
      //     seaCreatures: ['whelk'], 
      //     fossils: ['amber'] 
      //   },
      // }))


// Fetch API data
	useEffect(() => {
	  fetch("https://acnhapi.com/v1/fish")
        .then(res => res.json())
        .then(
          (result) => { setFishData(result) },
          (error) => {
          	console.log('there was an error with fish!')
          }
        )
	  fetch("https://acnhapi.com/v1/bugs")
        .then(res => res.json())
        .then(
          (result) => { setBugData(result) },
          (error) => {
          	console.log('there was an error with bugs!')
          }
        )
	  fetch("https://acnhapi.com/v1/sea")
        .then(res => res.json())
        .then(
          (result) => { setSeaCreatureData(result) },
          (error) => {
          	console.log('there was an error with sea creatures!')
          }
        )
	  fetch("https://acnhapi.com/v1/fossils")
        .then(res => res.json())
        .then(
          (result) => { setFossilData(result) },
          (error) => {
          	console.log('there was an error with fossils!')
          }
        )
  	}, [])

  	useEffect(() => {
      if (fishData && bugData && seaCreatureData && fossilData) {
      	// console.log('**** fishData', fishData)
      	// console.log('**** bugData', bugData)
      	// console.log('**** seaCreatureData', seaCreatureData)
      	// console.log('**** fossilData', fossilData)
      }
  	}, [fishData, bugData, seaCreatureData, fossilData])

  	useEffect(() => {
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
      <S.Headline>
        Animal Crossing New Horizons Collections Tracker
      </S.Headline>
      <S.IntroText>
        Welcome to the ACNH Collections Tracker v1.0!  See the availability and location on all the fish, bugs, sea 
        creatures, and fossils to be found in Animal Crossing: New Horizons, and keep track of everything you have donated to the museum!
      </S.IntroText>
      <S.IntroText>
        Version 1.0 provides basic display of info and tracking functionality, but I hope to add more options and 
        mobile-friendly layout in future versions soon.
      </S.IntroText>
      {/*<S.User>
        <div>User: Dropdown goes here</div>
        <div style={{'display': 'flex'}}>Add new user: <Input placeholder='Basic usage' /></div>
      </S.User>*/}
  		<Tabs onChange={(index) => setTabIndex(index)}>
  			<TabList className="tabs">
  				{categories.map((category) => <Tab>{category.displayName}</Tab>)}
  			</TabList>
  			<TabPanels>
  				{categories.map((category) => (
  					<Panel 
              category={category} 
              tabIndex={tabIndex} 
              visibilityData={visibilityData} 
              userData={userData}
              setUserData={setUserData}
            />
  				))}
  			</TabPanels>
  		</Tabs>
		</S.MainLayout>
	)
}

export default Main