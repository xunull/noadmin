#!/bin/bash
# 先判断mongodb ,redis 是否启动, 如果没有启动, 先启动
#

mongostat=`lsof -i:27017`

if [[ $mongostat =~ 'mongod' ]]
then
  printf "mongodb 已运行\n"
else
  printf "mongodb 未运行\n"
  (mongod >> ../logs/mongodb.log &)
  printf "mongod 已启动\n"
fi

redisstat=`lsof -i:12312`

if [[ $redisstat =~ 'redis-ser' ]]
then
  printf "redis 已运行\n"
else
  printf "reids 未运行\n"
  (redis-server ./redis.conf >> ../logs/redis.log &)
  printf "redis 已运行\n"
fi

printf "相关服务都已经正常运行\n"
