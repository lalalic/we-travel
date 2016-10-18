import React, {Component, PropTypes} from "react"
import {UI} from "qili-app"
import {TextField, DatePicker, IconButton, GridList, GridTile, Subheader, AppBar, Divider,} from "material-ui"
import IconUnSelected from 'material-ui/svg-icons/toggle/star-border'
import IconSelected from 'material-ui/svg-icons/toggle/star'
import IconPrint from "material-ui/svg-icons/action/print"
import IconView from "material-ui/svg-icons/action/pageview"

const {Messager, CommandBar}=UI


export default class Publisher extends Component{
	state={template:"light"}

    render(){
		const {_id}=this.props.params
		const {template}=this.state
		let cond=null
		if(!_id){
			cond=(<DatePicker ref="since"
				floatingLabelText="自从"
				autoOk={true} mode="landscape"/>)
		}
        return(
            <div>
				<AppBar title={`出版-留下永久的回忆`}
					showMenuIconButton={false}/>
				<center>
					{cond}

					<TextField ref="copy"
						floatingLabelText="打印多少本"
						defaultValue={1}
						type="number"/>
				</center>
				<GridList>
					<Subheader>选择出版模板</Subheader>

					{"light,dark,modern,gift".split(",").map(a=>(
						<GridTile key={a}
							titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
							title={a} titlePosition="top"
							actionPosition="left"
							actionIcon={<IconButton onClick={e=>this.setState({template:a})}>
									{template==a ?
										<IconSelected hoverColor="blue" color="yellow"/> :
										<IconUnSelected hoverColor="blue" color="white"/>
									}
								</IconButton>}>
							<img src={`images/template/${a}.jpg`}/>
						</GridTile>
					))}
				</GridList>
                <CommandBar className="footbar"
                    items={["Back",
						{action:"Preview", label:"预览", onSelect:e=>this.preview(), icon:IconView},
						{action:"Print", label:"云打印", onSelect:e=>this.print(), icon:IconPrint}
						]}/>
            </div>
        )
    }

	preview(){
		this.context.showMessage("stay tune")
	}

	print(){
		this.context.showMessage("Put into queue, please pay within 24 hours")
	}

	static contextTypes={
		showMessage: PropTypes.func
	}
}
