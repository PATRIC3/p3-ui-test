# where to write poll result
out_path="./results/indexer/indexer-status.txt"

# write json object to outpath
curl https://patricbrc.org/api/indexer -w "\n" >> $out_path

lines=`wc -l < $out_path`

if [[ $lines -gt 60 ]]
then
  tail -n +2 "$out_path" > "$out_path.tmp" && mv "$out_path.tmp" "$out_path"
fi

