for file in results/health/health_*
do
  echo "Aggregating ${file}..."
  node aggregators/health-calendar.js "$file"
  echo "Done."
done