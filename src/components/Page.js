import '../assets/sass/nlm/page.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { setLanguage } from '../store/actions'
import { constants } from '../store/_constants'
let { defaultLanguage } = constants

class Page extends Component {
    constructor(props) {
        super(props)

        this.setNumber = {
            0: 'one',
            1: 'one',
            2: 'two',
            3: 'three',
            4: 'four',
        }

        this.rgbLight = [239, 239, 239]
        this.rgbDark = [0, 0, 0]
    }

    resetPage = () => {
        this.props.dispatch({ type: 'SET_PAGE', page: 'home' })
        this.props.i18n.changeLanguage(defaultLanguage) // change locale
        this.props.dispatch(setLanguage(defaultLanguage)) // set redux language
    }

    renderPage(selectedPage, pages) {
        if (!pages.some(e => e.slug.split('-')[0] === selectedPage)) {
            console.log('page not there')
            this.resetPage()
        }

        return pages
            .filter(page => page.slug.split('-')[0] === selectedPage)
            .map((page, i) => {
                // let mediaURL = null
                // if (page._embedded['wp:featuredmedia']) {
                //     mediaURL = page._embedded['wp:featuredmedia'][0].source_url
                // }

                return (
                    <section
                        id="banner"
                        key={page.id}
                        // style={{
                        //     backgroundImage: `url(${mediaURL})`,
                        // }}
                    >
                        <header className="major">
                            <h1>{page.acf.title}</h1>
                            <div className="divider" />
                            <h3>{page.acf.subtitle}</h3>
                            <div className="inner-page">
                                <section className="spotlights-page">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: page.content.rendered,
                                        }}
                                    />
                                </section>
                            </div>
                        </header>
                    </section>
                    // </div>
                )
            })
    }

    render() {
        if (this.props.fetchingWP) {
            return (
                <div className="blinky">
                    {this.props.t('technical.loading')}
                </div>
            )
        }
        if (this.props.selectedPage === 'archives') {
            return null
        }
        return (
            // <div className="container">
            <React.Fragment>
                {this.renderPage(this.props.selectedPage, this.props.pages)}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    fetchingWP: state.WP.pages.isFetching || state.WP.posts.isFetching,
    selectedLanguage: state.selectedLanguage || defaultLanguage,
    selectedPage: state.WP.pages.isFetching
        ? []
        : state.WP.pages.items[state.selectedLanguage].some(
              page => page.slug.split('-')[0] === state.selectedPage
          )
        ? state.selectedPage
        : 'home',
    pages: state.WP.pages.isFetching
        ? []
        : state.WP.pages.items[state.selectedLanguage],
})

const withN = new withNamespaces()(Page)
export default connect(mapStateToProps)(withN)
