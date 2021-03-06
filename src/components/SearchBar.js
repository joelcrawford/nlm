import '../assets/sass/nlm/search.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import SidebarFilterList from './SidebarFilterList'
import { withNamespaces } from 'react-i18next'
import { constants } from '../store/_constants'
//import { getRandomInt } from '../tools/utilities'
import {
    resetOffsets,
    clearFilterArray,
    addTermToHistory,
    setCurrentSearchTerm,
    fetchResultsAction,
    fetchWorksAction,
    fetchAuthorsAction,
    fetchSubjectsAction,
    setMenu,
    setOffsets,
} from '../store/actions'
import { getTotal } from '../store/selectors'

let { searchOptions } = constants

class SearchBar extends Component {
    state = {
        term: this.props.currentSearchTerm, //'', //searchTerms[getRandomInt(0, searchTerms.length - 1)],
        offsetCurrent: 0,
        offsetSize: searchOptions.resultSetSize,
        initialLoad: true,
    }

    handleNext = () => {
        let action = null
        let args = null
        let offset = this.props.offsets[this.props.menu]
        const total = this.props.total

        if (total > offset + searchOptions.resultSetSize) {
            offset = offset + searchOptions.resultSetSize
            if (this.props.menu === 'search') {
                action = this.props.fetchResultsAction
                args = { term: this.state.term, offset: offset }
            } else if (this.props.menu === 'works') {
                action = this.props.fetchWorksAction
                args = { offset: offset }
            } else if (this.props.menu === 'authors') {
                action = this.props.fetchAuthorsAction
                args = { offset: offset }
            } else if (this.props.menu === 'subjects') {
                action = this.props.fetchSubjectsAction
                args = { offset: offset }
            }
            action(args)
            this.props.setOffsets(this.props.menu, offset)
        }
    }

    handlePrev = () => {
        let action = null
        let args = []

        let offset = this.props.offsets[this.props.menu]

        if (offset - searchOptions.resultSetSize >= 0) {
            offset = offset - searchOptions.resultSetSize
            if (this.props.menu === 'search') {
                action = this.props.fetchResultsAction
                args = { term: this.state.term, offset: offset }
            } else if (this.props.menu === 'works') {
                action = this.props.fetchWorksAction
                args = { offset: offset }
            } else if (this.props.menu === 'authors') {
                action = this.props.fetchAuthorsAction
                args = { offset: offset }
            } else if (this.props.menu === 'subjects') {
                action = this.props.fetchSubjectsAction
                args = { offset: offset }
            }
            action(args)
            this.props.setOffsets(this.props.menu, offset)
        } else {
            this.props.setOffsets(this.props.menu, 0)
        }
    }

    handleChange = e => {
        e.preventDefault()
        this.setState({ term: e.target.value })
    }

    handleSearch = e => {
        e.preventDefault()
        //this.updateSearchDefinitionAndFetch()
        const {
            resetOffsets,
            clearFilterArray,
            addTermToHistory,
            setCurrentSearchTerm,
            setMenu,
        } = this.props
        setMenu('search')
        resetOffsets()
        //clearResults()
        clearFilterArray()
        setCurrentSearchTerm(this.state.term)
        addTermToHistory(this.state.term)
        this.props.fetchResultsAction({ term: this.state.term, offset: 0 })
    }

    setUpControls = () => {
        const offset = this.props.offsets[this.props.menu]
        const total = this.props.total
        const properOffset =
            offset + searchOptions.resultSetSize > total
                ? total
                : offset + searchOptions.resultSetSize

        let disableNext =
            total <= offset + searchOptions.resultSetSize ||
            this.props.currentlyFetchingResults

        let disablePrev =
            total <= searchOptions.resultSetSize ||
            offset <= 0 ||
            this.props.currentlyFetchingResults

        let paginationMsg =
            total > 0
                ? `Showing <span className="boldy">${offset +
                      1} to ${properOffset} </span> of ${total}`
                : `&nbsp;`

        return { disableNext, disablePrev, paginationMsg }
    }

    render() {
        const { disableNext, disablePrev, paginationMsg } = this.setUpControls()
        return (
            <div className="search-form col">
                <div className="search-ctl">
                    <label htmlFor="search-input">Search</label>
                    <input
                        id="search-input"
                        className="search-input"
                        autoFocus
                        type="text"
                        value={this.state.term}
                        onChange={e => this.handleChange(e)}
                        onKeyDown={e =>
                            e.key === 'Enter' ? this.handleSearch(e) : null
                        }
                    />
                </div>
                <SidebarFilterList />
                <button
                    className="waves-effect waves-light btn"
                    disabled={this.props.currentlyFetchingResults}
                    onClick={e => this.handleSearch(e)}
                >
                    {this.props.currentlyFetchingResults
                        ? 'Searching'
                        : `Search`}
                </button>
                <div className="result-pagination">
                    <button
                        className="waves-effect waves-light btn"
                        disabled={disablePrev}
                        onClick={this.handlePrev}
                    >
                        PREV
                    </button>

                    <button
                        className="waves-effect waves-light btn"
                        disabled={disableNext}
                        onClick={this.handleNext}
                    >
                        NEXT
                    </button>
                </div>
                <div
                    className="result-pagination-msg"
                    dangerouslySetInnerHTML={{
                        __html: paginationMsg,
                    }}
                />
            </div>
        )
    }
}

function getStatus(browse, state) {
    if (state.ES[browse].isFetching || state.ES.search.isFetching) {
        return true
    }
    return false
}

function getMenu(menu, browse) {
    if (menu === 'search') {
        return 'search'
    }
    return browse
}

const mapStateToProps = state => ({
    offsets: state.offsets,
    menu: getMenu(state.selectedMenu, state.selectedBrowse),
    total: getTotal(state.selectedBrowse, state.selectedMenu, state),
    currentlyFetchingResults: getStatus(state.selectedBrowse, state),
    filterArray: state.filterArray,
    currentSearchTerm: state.currentSearchTerm,
})

const withN = new withNamespaces()(SearchBar)
export default connect(mapStateToProps, {
    resetOffsets,
    addTermToHistory,
    setCurrentSearchTerm,
    clearFilterArray,
    fetchResultsAction,
    fetchWorksAction,
    fetchAuthorsAction,
    fetchSubjectsAction,
    setMenu,
    setOffsets,
})(withN)
