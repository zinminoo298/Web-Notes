# PowerShell

## Bypass

In **Powershell**, If you can't run a module and this message is showing:

```
File filepath\file.ps1 cannot be loaded beacuse running srpits is disabled on this system. For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170
```

You can **bypass** using:

```
powershell -ExecutionPolicy Bypass -File filepath\script.ps1

powershell -ep Bypass filepath\script.ps1
```

**nodemon** path

```
powershell -ExecutionPolicy Bypass -File C:\Users\pyaes\AppData\Roaming\npm\nodemon.ps1
powershell -ep Bypass C:\Users\pyaes\AppData\Roaming\npm\nodemon.ps1
```

**express** path

```
powershell -ExecutionPolicy Bypass -File C:\Users\pyaes\AppData\Roaming\npm\express.ps1
powershell -ep Bypass C:\Users\pyaes\AppData\Roaming\npm\express.ps1
```

**RemoteSigned** ()

```
Set-ExecutionPolicy RemoteSigned
```

To restore **deafult** Execution Policy setting

```
Set-ExecutionPolicy Restricted
```

## Create new file

```
New-Item <filename.extension>
```

**OR**

```
New-Item <filename.extension> -type file
```

**Alias**

```
ni <filename.extension>
```
