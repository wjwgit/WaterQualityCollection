@echo off
echo ����MySql���ݿ��������Ϣ
set host=127.0.0.1
set port=3306
set user=root
set pass=123456

echo ����Ҫ����MySql���ݿ�����
set dbname=shuizhi

echo ��ȡ��������ڸ�ʽ�����磺20200902231300
set hour=%time:~0,2%
if "%time:~0,1%"==" " set hour=0%time:~1,1%

set backup_date=%Date:~0,4%%Date:~5,2%%Date:~8,2%%hour%%Time:~3,2%%Time:~6,2%

set backupdir=%cd%\dbbak

echo ���ñ����ļ���·��
set backupfile=%backupdir%\%dbname%-%backup_date%.sql


echo ʹ��mysqldump��ָ����MySql���б���
echo ע��·�����пո��Ҫ����˫����

"C:\Program Files\MySQL\MySQL Server 5.7\bin\mysqldump" -h%host% -P%port% -u%user% -p%pass% -c --add-drop-table %dbname% > %backupfile%

echo ɾ�������ļ��������ǳ���30���ɾ��

forfiles /p %backupdir% /s /m *.sql /d -30 /c "cmd /c del @file /f"

exit
