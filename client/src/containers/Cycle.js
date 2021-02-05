import React from 'react'
import PageHeader from "../components/PageHeader"
import requireAuth from "../hoc/requireAuth"
import CycleContainer from "../components/CycleComponents/CycleContainer"
const Cycle = () => {
    return (
        <PageHeader>
            <CycleContainer/>
        </PageHeader>
    )
}

export default requireAuth((Cycle))
