texdir=/usr/local/texlive/2013/bin/x86_64-darwin/
filename=thicket-jfla-2017

pdf: ps
	${texdir}/dvipdfm ${filename}.dvi

pdf-print: ps
	${texdir}/ps2pdf -dColorConversionStrategy=/LeaveColorUnchanged -dPDFSETTINGS=/printer ${filename}.ps

ps:	dvi
	${texdir}/dvips -t letter ${filename}.dvi

dvi:
	${texdir}/latex ${filename}
	${texdir}/bibtex ${filename}||true
	${texdir}/latex ${filename}
	${texdir}/latex ${filename}

clean:
	rm -f ${filename}.{ps,pdf,log,aux,out,dvi,bbl,blg}
