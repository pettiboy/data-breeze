import React from 'react'
import { Paper } from '@mui/material'
import GroupedBarChart from '../components/charts/GroupedBarChart'

type Props = {}

const Home = ({ }: Props) => {
    return (
        <Paper>
            <GroupedBarChart />
        </Paper>
    )
}

export default Home