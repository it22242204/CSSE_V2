import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  table: {
    width: '100%',
    border: '1px solid black',
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
  },
  td: {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
  },
});

// Create PDF component
export const TasksPDFDocument = ({ tasks }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Customers E-tickets </Text>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>No</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Topic</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Response</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{task.customername}</td>
                <td style={styles.td}>{task.email}</td>
                <td style={styles.td}>{task.topic}</td>
                <td style={styles.td}>{task.description}</td>
                <td style={styles.td}>{task.response}</td>
                <td style={styles.td}>{task.ticketstatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </View>
    </Page>
  </Document>
);
