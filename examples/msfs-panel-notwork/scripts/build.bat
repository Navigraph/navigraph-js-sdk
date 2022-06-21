"%MSFS_SDK%\Tools\bin\fspackagetool.exe" "navigraph-ingamepanels-demo\Build\navigraph-ingamepanels-demo.xml" -nopause
robocopy "navigraph-ingamepanels-demo\Build\Packages\navigraph-ingamepanels-demo\Build" "navigraph-ingamepanels-demo\InGamePanels" "navigraph-ingamepanels-demo.spb"

if exist "dist" @RD /S /Q "dist"
robocopy "navigraph-ingamepanels-demo" "dist\navigraph-ingamepanels-demo" /xd "Build" /s

exit /b 0