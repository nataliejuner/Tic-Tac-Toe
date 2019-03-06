import React from 'react'

class Status extends React.Component {

renderStatus = () => {
    let {winner, player} = this.props
        if(winner !== null){
            return <h3>Winner: {winner}</h3>
        }else{
            return <h3>Player: {player}</h3>
        }
    }

    render(){
        return(
            <div>
            {this.renderStatus()}
            </div>
        )
    }
}

export default Status;
