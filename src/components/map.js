import React from "react"

export default class BaiduMap extends React.Component {
    constructor(){
        super(...arguments)
        this.state={
            waypoints:null
        }
    }
    componentDidMount() {
        this._map = new BMap.Map(this.props.id);
        this._map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
        this._local = new BMap.LocalSearch(this._map, {
            renderOptions: { map: this._map },
            onInfoHtmlSet: poi => {
                if (typeof this.props.onSelect === 'function') {
                    this.props.onSelect(poi.marker.getPosition());
                }
            }
        });
    }

    render() {
        return <div id={this.props.id} {...this.props}></div>;
    }

    search(text) {
        this._local.search(text);
    }

    static propTypes = {
        id: React.PropTypes.string,
        onSelect: React.PropTypes.func
    }
}
