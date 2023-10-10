task=minecraft/bookshelf_3p
log_path=`echo ${task}_debug | tr / _`".txt"
echo $log_path
python -u main.py --task ${task} 2>&1 | tee -a logs/${log_path}
