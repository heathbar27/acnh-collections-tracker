import styled from 'styled-components'

const MainLayout = styled.div`
	margin: 20px 50px;

	.tab-panel {
		padding: 20px 0;
	}

	.tabs {
		border-top: 2px solid;
		border-color: inherit;

		button:hover {
			background-color: #eeeeee;
		}
	}

	table {
		font-size: 14px;
	}

	tr {
		:nth-child(even) {
			background-color: #f5f7e9;
		}

		&.donated td {
			background-color: #cccccc;
			-webkit-filter: grayscale(100%);
			filter: grayscale(100%);

			:first-child::before {
				position: absolute;
				top: 0;
				right: 0;
				display: block;
				content: '';
				padding-top: 3px;
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 0 50px 50px 0;
				border-color: transparent #999999 transparent transparent;
			}

			:first-child::after {
				position: absolute;
				top: 11px;
				right: -4px;
				display: block;
				content: 'DONATED';
				font-size: 10px;
				font-weight: bold;
				color: #ffffff;
				transform: rotate(45deg);
			}
		} 
	}

	th {
		border-bottom: 1px solid #39383d;
	}

	th, td {
		padding: 10px 15px;
	}

	td {
		border: 1px solid #39383d;
		position: relative;

		&.avail {
			background-color: #66b888 !important;
		}

		&.unavail {
			background-color: #c93335 !important;
		}
	}

	img {
		margin: 0 auto -5px;
	}

	.name {
		text-transform: capitalize;
		padding-bottom: 0;

		button {
			flex-grow: 1;
			font-size: 11px;
			font-weight: bold;
			background-color: #b1f5fb;
			color: #39383d;
			border-color: #71b6f7;
			border-width: 1px 1px 0 0;
			padding: 2px;
			margin-top: 15px;

			:last-child {
				border-right: 0;
			}

			:hover {
				background-color: #71b6f7;
				color: #f5f7e9;
			}

			:disabled {
				border-color: #888888;
			}
		}
	} 

	.location p, .time p {
		margin: 5px 0;
	}

`

const Headline = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
`

const IntroText = styled.p`
	margin-bottom: 20px;
`


const User = styled.div`
	display: flex;
	justify-content: space-between;
	max-width: 650px;
`

export default {
	MainLayout,
	Headline,
	IntroText,
	User,
}