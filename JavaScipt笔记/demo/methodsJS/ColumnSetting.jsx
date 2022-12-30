// import { SettingOutlined } from '@ant-design/icons'
import { Tooltip, Tree, Checkbox, Popover } from 'ant-design-vue'
const ColumnSetting = {
  data () {
    return {
      checkedKeys: [],
      defaultKeys: [],
      defaultColumns: [...this.columns]
    }
  },
  props: ['columns', 'stateColumns', 'self'],
  name: 'ColumnSetting',
  watch: {

  },
  created () {
    this.checkedKeys = this.treeKeys
    this.defaultKeys = this.treeKeys
    console.log(this.treeData, this.defaultKeys)
  },
  computed: {
    treeData () {
        return this.defaultColumns.filter(({ dataIndex }) => dataIndex !== 'serial').map(({ slot, dataIndex }) => ({ title: this.$t(slot), key: dataIndex, slots: { icon: 'smile' } })) || []
    },
    treeKeys () {
      return this.treeData.map(({ key }) => key)
    },
    // 全选
    checkAll () {
      return this.checkedKeys.length === this.defaultKeys.length
    },
    // 只要有默认选中的 就会选中
    indeterminate () {
      return !!this.checkedKeys.length && this.checkedKeys.length < this.defaultKeys.length
    }
  },
  methods: {
    checkColumns (val) {
      // console.log(this.defaultColumns)
      const columns = this.defaultColumns.filter(({ dataIndex }) => val.includes(dataIndex))
      console.log(this.self)
       // this.$emit('update:columns', columns)
      this.stateColumns(columns)
    },
    // 设置是否全选
    SetAllSelect () {
      const onCheckAllChange = (e) => {
        // Object.assign(this, {
        //   checkedKeys: e.target.checked ? this.defaultKeys : [],
        //   indeterminate: false
        //   checkAll: e.target.checked
        // })
        this.checkedKeys = e.target.checked ? this.defaultKeys : []
      }
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }} >
          <Checkbox
            indeterminate={this.indeterminate}
            checked={this.checkAll}
            onChange={onCheckAllChange}
          >
            列展示
          </Checkbox>
          <a
            onClick={() => {
              this.checkedKeys = [...this.defaultKeys]
              this.checkColumns(this.checkedKeys)
            }}
          >
            重置
          </a>
      </div>
      )
    }

  },
  render () {
    // console.log(this)
    const { checkedKeys, treeData } = this
    const onCheck = (val) => {
      this.checkedKeys = val
      this.checkColumns(val)
      console.log(val, this.defaultColumns)
    }
    return (
      <div class="column-setting" style={{ paddingBottom: '16px', display: 'flex', justifyContent: 'flex-end', cursor: 'pointer', fontSize: '16px' }}>
        <Popover
          title={
            this.SetAllSelect()
          }
          trigger="click"
          placement="bottomRight"
          content={
            <TreeList checkedKeys={checkedKeys} treeData={treeData} onCheck={onCheck} />
          }>
          <Tooltip title='列设置'>
            <a-icon type="setting" />
          </Tooltip>
        </Popover>
      </div>
    )
  }
}

// 下拉字段列表
const TreeList = {
  props: ['treeData', 'checkedKeys'],
  name: 'TreeList',
  render () {
    const { treeData, checkedKeys } = this.$props
    const onSelect = (selectedKeys, info) => {
      console.log('selected', selectedKeys, info)
    }
    const onCheck = (checkedKeys, info) => {
      this.$emit('check', checkedKeys)
    }
    return (
      <Tree
        checkable
        onSelect={onSelect}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        treeData={treeData}
      >
        {/* <a-tree-node key="0-1" title="leaf">
          <a-icon slot="icon" type="carry-out" />
          <a-icon slot="switcherIcon" type="form" />
        </a-tree-node> */}
      </Tree>
    )
  }
}

const Ceshi = 1111

export { ColumnSetting, Ceshi }
