for file in results/health/health_*
do
  echo "Aggregating ${file}..."
  node reporters/aggregators/health-calendar.js "$file"
  echo "Done."
done