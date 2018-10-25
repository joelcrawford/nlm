import React from 'react'
import PropTypes from 'prop-types'
import { setPage } from '../actions'
import { connect } from 'react-redux'

const NavItem = ({ active, children, onClick }) => (
    <li
      key={children}
       onClick={active ? null : onClick}
       className={active ? "nav-active" : "nav"}
       style={active ? 
        { color: 'red', } :
        { color: 'black', } 
        }
    >
      {children}
    </li>
)

NavItem.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}



const mapStateToProps = (state, ownProps) => ({
  active: ownProps.selectedPage === state.selectedPage
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(setPage(ownProps.selectedPage)) 
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavItem)
