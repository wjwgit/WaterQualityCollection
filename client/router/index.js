import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/index'
import initpage from '@/components/initpage'

import jcsj from '@/components/sjcx/jcsj'
import khrw from '@/components/xtkz/khrw'
import jdbd from '@/components/xtkz/jdbd'
import xtkz from '@/components/xtkz'
import jbsz from '@/components/jbsz'
import cssz from '@/components/cssz'

import yhgl from '@/components/qtpz/yhgl'
import spgl from '@/components/qtpz/spgl'
import ywjl from '@/components/qtpz/ywjl'
import bbjl from '@/components/sjcx/bbjl'


import lct22 from '@/components/lct22'
import sssj from '@/components/sssj'
import lct from '@/components/lct'
import lctfc from '@/components/lctfc'


import spjk from '@/components/spjk'
import wscx from '@/components/sjcx/wscx'

import zkcx from '@/components/sjcx/zkcx'
import qxfx from '@/components/sjcx/qxfx'
import gztj from '@/components/sjcx/gztj'
import bjtj from '@/components/sjcx/bjtj'

import ywrl from '@/components/sjcx/ywrl'


import bjsj from '@/components/sjcx/bjsj'
import yjsj from '@/components/sjcx/yjsj'
import rzsj from '@/components/sjcx/rzsj'
import sbsj from '@/components/sjcx/sbsj'
import ckkz from '@/components/xtkz/ckkz'
import sbgl from '@/components/xtkz/sbgl'
import jbkz from '@/components/xtkz/jbkz'
import dtjb from '@/components/xtkz/dtjb'

import bjhcgl from '@/components/qtpz/bjhcgl'
import bjyy from '@/components/qtpz/bjyy'

//数据超标统计
import sjcbtj from '@/components/tjfx/sjcbtj';
//运维周期统计
import ywzqtj from '@/components/tjfx/ywzqtj';
//有效数据统计
import yxsjtj from '@/components/tjfx/yxsjtj';
//运行时长统计
import yxsctj from '@/components/tjfx/yxsctj';

import zjsj from '@/components/sjcx/zjsj';



// 定制化开发
import plcbfkz from '@/components/dzkf/plcbfkz';

// 电池数据
import dcsj from '@/components/sjcx/dcsj';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/indexs',
      name: 'indexs',
      component: () => import('@/components/indexs')
    },
    {
      path: '/initpage',
      name: 'initpage',
      component: initpage
    },
    {
      path: '/',
      name: '主页面',
      component: index,

      // redirect: 'lct',
      children: [
       
        {
          path: '/yhgl',
          name: '用户管理',
          component: yhgl
        }, {
          path: '/jbsz',
          name: '基本设置',
          component: jbsz
        }, {
          path: '/sssj',
          name: '实时数据',
          // component: () => import('@/components/sssj')
          component: sssj

        },
        {
          path: '/error',
          name: '404',
          component: () => import('@/components/error')
        },
        {
          path: '/lct22',
          name: '首页',
          // component: () => import('@/components/lct22')
          component: lct22
        },
        {
          path: '/lctfc',
          name: '首页',
          // component: () => import('@/components/lct22')
          component: lctfc
        },
        {
          path: '/lct',
          name: '首页',
          // component: () => import('@/components/lct')
          component: lct
        },
        {
          path: '/khrw',
          name: '周质控',
          // component: () => import('@/components/xtkz/khrw')
          component: khrw
        },
        {
          path: '/jbkz',
          name: '加标控制',
          // component: () => import('@/components/xtkz/jbkz')
          component: jbkz
        },
        {
          path: '/dtjb',
          name: '动态加标',
          // component: () => import('@/components/xtkz/jbkz')
          component: dtjb
        },
        {
          path: '/jdbd',
          name: '季度比对',
          // component: () => import('@/components/xtkz/jbkz')
          component: jdbd
        },
        {
          path: '/xtkz',
          name: '系统控制',
          // component: () => import('@/components/xtkz')
          component: xtkz
        },
        {
          path: '/cssz',
          name: '参数设置',
          component: cssz
        },
        {
          path: '/spjk',
          name: '视频监控',
          // component: () => import('@/components/xtkz')
          component: spjk
        },

        {
          path: '/jcsj',
          name: '监测数据',

          // component: () => import('@/components/sjcx/jcsj')
          component: jcsj
        },
        {
          path: '/qxfx',
          name: '曲线分析',
          // component: () => import('@/components/sjcx/qxfx')
          component: qxfx
        },
        {
          path: '/gztj',
          name: '系统故障统计',
          // component: () => import('@/components/sjcx/qxfx')
          component: gztj
        },

        {
          path: '/bjtj',
          name: '备品备件统计',
          // component: () => import('@/components/sjcx/qxfx')
          component: bjtj
        },
        {
          path: '/ywrl',
          name: '运维日历',
          // component: () => import('@/components/sjcx/qxfx')
          component: ywrl
        },

        {
          path: '/bjsj',
          name: '报警数据',
          // component: () => import('@/components/sjcx/bjsj')
          component: bjsj
        },
        {
          path: '/yjsj',
          name: '预警数据',
          // component: () => import('@/components/sjcx/bjsj')
          component: yjsj
        },
        {
          path: '/dcsj',
          name: '电池数据',
          // component: () => import('@/components/sjcx/rzsj')
          component: dcsj
        },
        {
          path: '/rzsj',
          name: '日志数据',
          // component: () => import('@/components/sjcx/rzsj')
          component: rzsj
        },
        {
          path: '/sbsj',
          name: '上报数据',
          // component: () => import('@/components/sjcx/sbsj')
          component: sbsj
        },
        {
          path: '/zkcx',
          name: '质控查询',
          // component: () => import('@/components/zkcx')
          component: zkcx

        },
        {
          path: '/wscx',
          name: '污水监控',
          // component: () => import('@/components/zkcx')
          component: wscx

        },
        
        {
          path: '/plcbfkz',
          name: '泵阀控制',
          component: plcbfkz
        },
        {
          path: '/ckkz',
          name: '设备管理',
          component: ckkz
        },
        {
          path: '/sbgl',
          name: '设备管理',
          component: sbgl
        },
        {
          path: '/ywjl',
          name: '运维记录',
          component: ywjl
        },   
        {
          path: '/bbjl',
          name: '报备记录',
          component: bbjl
        },
        
        {
          path: '/spgl',
          name: '视频管理',
          component: spgl
        },
        {
          path: '/bjhcgl',
          name: '备件耗材管理',
          // component: () => import('@/components/xtkz/ckkz')
          component: bjhcgl
        },
        {
          path: '/bjyy',
          name: '诊断管理',
          // component: () => import('@/components/xtkz/ckkz')
          component: bjyy
        },
        {
          path: '/sjcbtj',
          name: '数据超标统计',
          // component: () => import('@/components/xtkz/ckkz')
          component: sjcbtj
        },
        {
          path: '/ywzqtj',
          name: '运维周期统计',
          // component: () => import('@/components/xtkz/ckkz')
          component: ywzqtj
        },
        {
          path: '/yxsjtj',
          name: '有效数据统计',
          // component: () => import('@/components/xtkz/ckkz')
          component: yxsjtj
        },
        {
          path: '/yxsctj',
          name: '运行时长统计',
          // component: () => import('@/components/xtkz/ckkz')
          component: yxsctj
        },
        {
          path: '/zjsj',
          name: '自检数据',
          // component: () => import('@/components/xtkz/ckkz')
          component: zjsj
        },
        {
          path: '/401',
          name: '401',
          component: () => import('@/components/401')
        },

      ]
    },
  ]
})
