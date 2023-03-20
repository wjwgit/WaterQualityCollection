@echo off
echo 设置MySql数据库的连接信息
set host=127.0.0.1
set port=3306
set user=root
set pass=123456

echo 设置要备份MySql数据库名称
set dbname=shuizhi

echo 获取当天的日期格式，例如：20200902231300
set hour=%time:~0,2%
if "%time:~0,1%"==" " set hour=0%time:~1,1%

set backup_date=%Date:~0,4%%Date:~5,2%%Date:~8,2%%hour%%Time:~3,2%%Time:~6,2%

set backupdir=%cd%\dbbak

echo 设置备份文件的路径
set backupfile=%backupdir%\%dbname%-%backup_date%.sql


echo 使用mysqldump对指定的MySql进行备份
echo 注意路径中有空格的要加上双引号

"C:\Program Files\MySQL\MySQL Server 5.7\bin\mysqldump" -h%host% -P%port% -u%user% -p%pass% -c --add-drop-table %dbname% > %backupfile%

echo 删除过期文件，这里是超过30天就删除

forfiles /p %backupdir% /s /m *.sql /d -30 /c "cmd /c del @file /f"

exit
