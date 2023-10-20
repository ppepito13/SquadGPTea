import React from "react";
import { Button, Row } from "reactstrap";
import { IAttribute, IAttributeGroup } from "../../attributes/attribute";
import * as _ from "underscore";
import Select from 'react-select'
import shortid from "shortid";
import { Colxx } from "../../../../components/common/CustomBootstrap";

export interface IAttributeGroupItem {
    id: number,
    attributes: number[],
    unRemovable?: boolean
}

export interface IAttributeSelectorProps {
    attributeGroups: IAttributeGroup[],
    selectedAttributeGroups: IAttributeGroupItem[],
    onChange: (items: IAttributeGroupItem[]) => void
}

export interface IAttributeSelectorState {
    selectedAttributeGroups: IAttributeGroupItem[]
}

export class AttributeSelector extends React.Component<IAttributeSelectorProps, IAttributeSelectorState> {
    constructor(props: IAttributeSelectorProps) {
        super(props);
        this.state = {
            selectedAttributeGroups: []
        }
    }

    componentDidMount() {
        this.setState({ selectedAttributeGroups: this.props.selectedAttributeGroups });
    }

    componentDidUpdate(prevProps: IAttributeSelectorProps, prevState: IAttributeSelectorState) {
        if (!_.isEqual(prevProps.selectedAttributeGroups, this.props.selectedAttributeGroups)) {
        // if (!_.isEqual(prevProps.selectedAttributeGroups, this.props.selectedAttributeGroups) && !!this.props.selectedAttributeGroups[0].id) {
            this.setState({ selectedAttributeGroups: this.props.selectedAttributeGroups });
        }
    }

    triggerOnChange() {
        this.props.onChange(this.state.selectedAttributeGroups);
    }

    convertAttributeGroupToItem = (attributeGroups: IAttributeGroup[]): IAttributeGroupItem[] => {
        return attributeGroups.map(attrG => ({ id: attrG.Id, attributes: attrG.attributes.map(x => x.Id) }));
    }

    attributeGroupsToSelect = (attributeGroups: IAttributeGroup[]) => {
        return attributeGroups.map(attr => ({ label: attr.Name, value: attr.Id, attributeGroup: attr }));
    }

    attributesToSelect = (attributs: IAttribute[]) => {
        return attributs.map(attr => ({ label: attr.Name, value: attr.Id, attribute: attr }));
    }

    addGroup = () => {
        let groups = [...this.state.selectedAttributeGroups];
        groups.push({ id: 0, attributes: [] });
        this.setState({ selectedAttributeGroups: groups }, () => { this.triggerOnChange() });
    }

    onSelectAttributeGroup = (data: any, index: number) => {
        let groups = [...this.state.selectedAttributeGroups];
        if (groups.findIndex(x => x.id == data.value) < 0) {
            groups[index].id = data.value;
            groups[index].attributes = [];
            this.setState({ selectedAttributeGroups: groups }, () => { this.triggerOnChange() });
        }
    }

    onSelectAttribute = (data: { label: string, value: number, attribute: IAttribute }[], index: number) => {
        let groups = [...this.state.selectedAttributeGroups];
        groups[index].attributes = data ? data.map(x => x.value) : [];
        this.setState({ selectedAttributeGroups: groups }, () => { this.triggerOnChange() });

    }

    removeAttributeGroup = (index: number) => {
        let groups = [...this.state.selectedAttributeGroups];
        groups.splice(index, 1);
        this.setState({ selectedAttributeGroups: groups }, () => { this.triggerOnChange() });
    }

    getAttributeGroup = (id: number): IAttributeGroup => {
        var item = this.props.attributeGroups.find(x => x.Id == id);
        if (item) {
            return item
        }
        return { attributes: [], id: 0 } as any
    }

    getAttribute = (id: number): IAttribute => {
        let attributes = this.props.attributeGroups.map(x => x.attributes).reduce((a, b) => a.concat(b), []);
        return attributes.find(x => x.Id == id) as IAttribute;
    }

    attributeGroupItemToSelect = (id: number) => {
        let attributeGroup = this.getAttributeGroup(id);
        if (attributeGroup) {
            return { value: attributeGroup.Id, label: attributeGroup.Name }
        }
        return {}
    }

    attributeListToSelect = (ids: number[]) => {
        return ids.map(attributeId => {
            let attribute = this.getAttribute(attributeId);
            return { value: attribute.Id, label: attribute.Name, attribute: attribute }
        })
    }

    render() {
        return (<>
            <div>
                {
                    this.state.selectedAttributeGroups.map((attributegGroup, index) => {
                        return (<div key={"attr-group" + index} className="mb-2">
                            <Row>
                                <Colxx xxs="10">
                                    <Select
                                      defaultValue={this.attributeGroupItemToSelect(attributegGroup.id)}
                                      value={this.attributeGroupItemToSelect(attributegGroup.id)}
                                      name="attributeGroup"
                                      options={this.attributeGroupsToSelect(this.props.attributeGroups)}
                                      onChange={(data) => this.onSelectAttributeGroup(data, index)}
                                      isDisabled={attributegGroup.unRemovable}/>
                                    {(this.getAttributeGroup(attributegGroup.id) as any).attributes.length > 0 ?
                                      <Select
                                        defaultValue={this.attributeListToSelect(attributegGroup.attributes)}
                                        value={this.attributeListToSelect(attributegGroup.attributes)}
                                        isMulti
                                        name="attributes"
                                        options={this.attributesToSelect(this.getAttributeGroup(attributegGroup.id).attributes)}
                                        onChange={(data) => this.onSelectAttribute(data, index)} />
                                      : null}
                                </Colxx>
                                <Colxx xxs="2" className="p-0">
                                    <Button color="danger" outline onClick={() => this.removeAttributeGroup(index)} disabled={attributegGroup.unRemovable}><i className="simple-icon-trash" /></Button>
                                </Colxx>
                            </Row>
                        </div>)
                    })
                }

            </div>
            <Button color="secondary" outline onClick={() => this.addGroup()}>
                <i className="simple-icon-plus" /> Add attributes
            </Button>
        </>)
    }
}

export default AttributeSelector;
