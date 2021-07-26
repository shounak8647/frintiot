import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ProjectDetail from '../components/ProjectDetail';
import {appUrl, cookie} from '../config';

export default function ProjectScreen() {
  const [projects, setProjects] = useState(null);

  const getData = async () => {
    try {
      const req = await fetch(`${appUrl}/project/list`, {
        headers: {
          Cookie: cookie,
        },
      });
      console.log(appUrl, req.status);
      if (req.status == 200) {
        const res = await req.json();
        console.log(res);
        return setProjects(res);
      } else if (req.status == 401) {
        alert('Please login to continue');
      } else {
        throw new Error(`Something went wrong: ${req.status}`);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(getData, []);

  const projectRes = '';

  if (!projects) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.row}>
          {projects.result.map(project => {
            return (
              <View style={styles.projectWrapper} key={project._id}>
                <ProjectDetail
                  style={styles.projectStyle}
                  title={project.displayName}
                  projectId={project.projectId}
                  icon=""
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#333',
    flexDirection: 'row',
  },
  scroll: {
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'column',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  projectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    width: '50%',
    maxWidth: '50%',
    borderColor: 'black',
  },
  projectStyle: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
