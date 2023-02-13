import React, { Component } from 'react'
import styled from 'styled-components'

const MainLayout = styled.div`
	margin: 20px 50px;

	.tab-panel {
		padding: 20px 0;
	}

	table {
		font-size: 14px;
	}

	tr {
		:nth-child(even) {
			background-color: #f5f7e9;
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

		&.avail, &.unavail {
			color: #ffffff;
			font-weight: bold;
		}

		&.avail {
			background-color: #66b888;
		}

		&.unavail {
			background-color: #c93335;
		}
	}

	img {
		margin: 0 auto -5px;
	}

	.name {
		text-transform: capitalize;
		padding-bottom: 0;

		button {
			width: 100%;
			font-size: 11px;
			font-weight: bold;
			background-color: #b1f5fb;
			color: #39383d;
			border-color: #71b6f7;
			border-width: 1px 1px 0 0;
			padding: 2px;
			margin-top: 10px;

			:last-child {
				border-right: 0;
			}

			:hover {
				background-color: #71b6f7;
				color: #f5f7e9;
			}
		}
	} 

	.location p, .time p {
		margin-bottom: 5px;
	}

`

export default {
	MainLayout,
}