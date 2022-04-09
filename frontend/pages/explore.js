import ExploreFeed from '../components/ExploreFeed';
import FilterSideBar from '../components/FilterSideBar';
import StarsSideBar from '../components/StarsSideBar';
import styles from '../styles/Index.module.css';
function explore() {
  return (
    <div className={styles.container}>
      <div className={styles.exploreFlex}>
        <FilterSideBar />
        <ExploreFeed />
        <StarsSideBar />
      </div>
    </div>
  );
}

export default explore;
