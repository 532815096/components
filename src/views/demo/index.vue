<template>
    <div class="content">
        <kd-tabs v-model="tab">
            <kd-tab value="list">list</kd-tab>
            <kd-tab value="table">table</kd-tab>
        </kd-tabs>

        <div v-if="tab === 'list'">
            <div class="lists">

                <draggable :list="items" :options="{group:'listGroup', animation:150}"
                           @start="drag=true" @end="dragComponent">
                    <transition-group :name="!drag? 'list-complete' : null" :css="true">
                        <div class="list" v-for="item in items" :key="'num_' + item">
                            <span class="list-drag  kd-icon-checkbox-disabled"></span>
                            <span class="list-value connot-draggable">I am NO.{{ item }}</span>
                        </div>
                    </transition-group>
                </draggable>

            </div>
        </div>

        <div v-if="tab === 'table'">
            <div class="table-container">
                <div class="each-table-content"
                     v-for="(item, index) in blocks">

<!--                    <select-block :select-content="'select_content_' + item.id">-->
                    <!--                        <div class="each-table-title">-->
                    <!--                            {{ item.name }}-->
                    <!--                            </div>-->
                    <!--                            <div class="each-table-blocks"-->
                    <!--                                 :id="'select_content_' + item.id">-->
                    <!--                                <div class="table-blocks-content">-->
                    <!--                                    <draggable :list="item.blocks"-->
                    <!--                                               :key="item.name"-->
                    <!--                                               :options="{group:item.name, animation:150}"-->
                    <!--                                               @start="drag=true"-->
                    <!--                                               @end="dragComponent">-->
                    <!--                                        <transition-group :name="!drag? 'list-complete' : null" :css="true">-->

                    <!--                                            <div class="each-table-block"-->
                    <!--                                                 v-for="inner in item.blocks"-->
                    <!--                                                 :key="'block_' + inner.id"-->
                    <!--                                            >{{ inner.name }}</div>-->

                    <!--                                        </transition-group>-->
                    <!--                                    </draggable>-->

                    <!--                                </div>-->
                    <!--                            </div>-->
                    <!--                    </select-block>-->



                            <div class="each-table-title">{{ item.name }}</div>
                            <div class="each-table-blocks">
                                <select-block v-model="item.blocks"
                                              :no-trigger-class="['each-table-block', 'each-table-edite']"
                                              select-class="each-table-block"
                                              @select="(data) => {selectDom(data, index)}">
                                    <div class="table-blocks-content">
                                         <draggable :list="item.blocks"
                                                    :key="item.name"
                                                    :options="{group:item.name, animation:150}"
                                                    @start="drag=true"
                                                    @end="dragComponent">
                                            <transition-group :name="!drag? 'list-complete' : null" :css="true">

                                                <div v-for="(inner, _index) in item.blocks"
                                                     @click="clickBlock(inner, index, _index)"
                                                     @dblclick="(ev) => {editeBlock(ev, inner)}"
                                                     :class="{
                                                            'each-table-block': true,
                                                            'select': inner.select
                                                        }"
                                                     :key="'block_' + inner.id"
                                                >
                                                    {{ inner.name }}
                                                    <input class="each-table-edite"
                                                           v-model="inner.name"
                                                           @keyup.enter.stop="inner.isEdite = false"
                                                           :style="{
                                                                'display': inner.isEdite ? 'block' : 'none'
                                                           }" />
                                                </div>

                                            </transition-group>
                                        </draggable>

                                    </div>
                                </select-block>
                            </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Draggable from '../../components/Draggable/Draggable';
import SelectBlock from "../../components/SelectBlock/SelectBlock";

export default {
    data() {
        return {
            tab: 'table',
            drag: false,
            items: [1, 2, 3, 4, 5],

            blocks: [
                {
                    id: 'name_1',
                    name: 'NO.1',
                    blocks: [
                        {
                            id: 1,
                            name: 'NO.1-1'
                        },
                        {
                            id: 2,
                            name: 'NO.1-2'
                        },
                        {
                            id: 3,
                            name: 'NO.1-3'
                        },
                        {
                            id: 4,
                            name: 'NO.1-4'
                        },
                        {
                            id: 5,
                            name: 'NO.1-5'
                        },
                        {
                            id: 6,
                            name: 'NO.1-6'
                        },
                        {
                            id: 7,
                            name: 'NO.1-7'
                        },
                        {
                            id: 8,
                            name: 'NO.1-8'
                        },
                        {
                            id: 9,
                            name: 'NO.1-9'
                        },
                        {
                            id: 10,
                            name: 'NO.1-10'
                        },
                        {
                            id: 11,
                            name: 'NO.1-11'
                        },
                        {
                            id: 12,
                            name: 'NO.1-12'
                        },
                        {
                            id: 13,
                            name: 'NO.1-13'
                        },
                        {
                            id: 14,
                            name: 'NO.1-14'
                        },
                        {
                            id: 15,
                            name: 'NO.1-15'
                        },
                        {
                            id: 16,
                            name: 'NO.1-16'
                        },
                        {
                            id: 17,
                            name: 'NO.1-17'
                        },
                        {
                            id: 18,
                            name: 'NO.1-18'
                        },
                        {
                            id: 19,
                            name: 'NO.1-19'
                        },
                        {
                            id: 20,
                            name: 'NO.1-20'
                        }
                    ]
                },
                {
                    id: 'name_2',
                    name: 'NO.2',
                    blocks: [
                        {
                            id: 21,
                            name: 'NO.2-1'
                        },
                        {
                            id: 22,
                            name: 'NO.2-2'
                        },
                        {
                            id: 23,
                            name: 'NO.2-3'
                        },
                        {
                            id: 24,
                            name: 'NO.2-4'
                        },
                        {
                            id: 25,
                            name: 'NO.2-5'
                        },
                        {
                            id: 26,
                            name: 'NO.2-6'
                        },
                        {
                            id: 27,
                            name: 'NO.2-7'
                        },
                        {
                            id: 28,
                            name: 'NO.2-8'
                        },
                        {
                            id: 29,
                            name: 'NO.2-9'
                        },
                        {
                            id: 30,
                            name: 'NO.2-10'
                        },
                        {
                            id: 31,
                            name: 'NO.2-11'
                        },
                        {
                            id: 32,
                            name: 'NO.2-12'
                        },
                        {
                            id: 33,
                            name: 'NO.2-13'
                        },
                        {
                            id: 34,
                            name: 'NO.2-14'
                        },
                        {
                            id: 35,
                            name: 'NO.2-15'
                        },
                        {
                            id: 36,
                            name: 'NO.2-16'
                        },
                        {
                            id: 37,
                            name: 'NO.2-17'
                        },
                        {
                            id: 38,
                            name: 'NO.2-18'
                        },
                        {
                            id: 39,
                            name: 'NO.2-19'
                        },
                        {
                            id: 40,
                            name: 'NO.2-20'
                        }
                    ]
                }
            ],
            checkedData: [],
            copyData: [],
            localLast: {
                parentIndex: null,
                childrenIndex: null
            }
        };
    },

    components: {
        Draggable,
        SelectBlock
    },

    mounted() {
        document.addEventListener('keypress', (e) => {
            //复制
            if (e.ctrlKey && e.keyCode == 3) {
                this.copyData = this.restArray(this.checkedData);
                this.copyData.forEach(item => {
                    //防止id重复导致vue报错
                    item.id += 1000;
                    item.name = item.name + 'copy';
                    item.select = false;
                })
            }

            //粘贴
            if (e.ctrlKey && e.keyCode == 22) {
                this.ctrV();
            }
        })
    },

    methods: {
        dragComponent() {
            this.drag = false;
        },
        restArray(array) {
            return JSON.parse(JSON.stringify(array));
        },
        selectDom(data, index) {
            this.initBlock(index);
            this.blocks[index].blocks.forEach(item => {
                data.forEach(inner => {
                    if (item == inner) {
                        item.select = true;
                    }
                })
            });
            this.checkedData = [];
            this.blocks.forEach(item => {
                let selectData = item.blocks.filter(item => item.select);
                this.checkedData = this.checkedData.concat(selectData);
            })
        },
        initBlock(index) {
            this.blocks[index].blocks.forEach(item => {
                this.$set(item, 'select', false);
            })
        },
        clickBlock(item, index, childrenIndex) {
            // if(item.select){
            //     item.select = false;
            //     this.localLast = {
            //         parentIndex: null,
            //         childrenIndex: null
            //     };
            // }
            // else{
            //     item.select = true;
            //     this.localLast = {
            //         parentIndex: index,
            //         childrenIndex: childrenIndex
            //     };
            // }

            this.localLast = {
                parentIndex: index,
                childrenIndex: childrenIndex
            };

            this.selectDom([item], index);
        },
        ctrV() {
            if(this.localLast.parentIndex == null || this.localLast.childrenIndex == null) return false;
            let blocks = this.blocks[this.localLast.parentIndex].blocks;
            // last
            if(this.localLast.childrenIndex == blocks.length - 1){
                this.blocks[this.localLast.parentIndex].blocks = blocks.concat(this.copyData);
            }
            else{
                let leftArray = blocks.slice(0, this.localLast.childrenIndex + 1);
                let rightArray = blocks.slice(this.localLast.childrenIndex + 1, blocks.length);
                this.blocks[this.localLast.parentIndex].blocks = [...leftArray, ...this.copyData, ...rightArray];
            }
        },
        editeBlock(ev, item){
            this.blocks.forEach(block => {
                block.blocks.forEach(inner => {
                    this.$set(inner, 'isEdite', false);
                })
            })
            this.$set(item, 'isEdite', true);
            let target = ev.target;
            let input = target.querySelector('.each-table-edite');
            setTimeout(() => {
                input.select();
            }, 200)
        }
    }
};
</script>
<style lang="stylus" scoped>
.lists
    width 800px
    list-style none
    margin 40px

    .list
        display flex
        width 560px
        height 40px
        border 1px solid #ececec
        padding-left 20px
        margin-bottom 10px
        background-color #fff
        align-items center

        .list-drag
            display flex
            margin-right 40px
            cursor move

        .list-value
            display flex
            flex 1
            padding-right 20px
            line-height 40px

.table-container
    width 1300px
    height 400px
    border 1px solid #ececec
    margin 40px auto

    .each-table-content
        display flex
        flex 1
        height 200px
        border-bottom 1px solid #ececec

        &:last-child
            border-bottom none

        .each-table-title
            display flex
            border-right 1px solid #ececec
            width 320px
            font-size 24px
            align-items center
            justify-content center

        .each-table-blocks
            display flex
            flex 1

            .table-blocks-content
                width 100%
                height 190px
                padding 5px
                overflow-y auto

                .each-table-block
                    width 160px
                    height 30px
                    float left
                    border 1px solid #ececec
                    background-color #fff
                    margin 5px
                    line-height 30px
                    padding 0 10px
                    position relative
                    .each-table-edite
                        width 160px
                        height 26px
                        position absolute
                        top 1px
                        left 10px
                        border none
                        display none

                    &.select
                        border-color #c4c3c3

.inner-content-draging
    .each-table-block
        user-select none

</style>
