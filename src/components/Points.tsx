import * as React from 'react'
import RoundDomain from '../services/RoundDomain'
import connect from 'immview-react-connect'

const PointsStyle = {
    fontSize: 40,
    fontFamily: 'sans-serif',
    marginTop: '2vh'
}

class Points extends React.Component<{ amount: number }, {}> {
    render() {
        return (
            <div style={PointsStyle}>
                {this.props.amount}
            </div>
        )
    }
}

export default connect(
    Points,
    RoundDomain,
    ({points}) => ({ amount: points })
)