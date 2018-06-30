describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = computeUsersStats(users, progress, courses);
      
      assert.equal(users.length, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {

      const processed = computeUsersStats(users, progress, courses);

      it(
        'debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreSum: 57,
          scoreAvg: 29,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    });

  });

  describe('sortUsers(users, orderBy, orderDirection)', () => {

    it('debería retornar arreglo de usuarios ordenado por nombre ASC', () => {
      const users = fixtures.users;
      
      const order = users.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
      });

      const processed = sortUsers(users, 'name', 'ASC');
      
      assert.deepEqual(order, processed);

    });
    it('debería retornar arreglo de usuarios ordenado por nombre DESC', () => {
      const users = fixtures.users;
      
      const order = users.sort((a, b) => {
        if (b.name > a.name) {
          return 1;
        }
        if (b.name < a.name) {
            return -1;
        }
        return 0;
      });

      const processed = sortUsers(users, 'name', 'DESC');
      
      assert.deepEqual(order, processed);

    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC', () => {
      const users = fixtures.users;
      
    
      const order = users.sort((a, b) => {
        if (a.stats.percent > b.stats.percent) {
          return 1;
        }
        if (a.stats.percent < b.stats.percent) {
            return -1;
        }
        return 0;
      });

      const processed = sortUsers(users, 'percent', 'ASC');
      
      assert.deepEqual(order, processed);  
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC', () => {
      const users = fixtures.users;
      
      const order = users.sort((a, b) => {
        if (b.stats.percent > a.stats.percent) {
          return 1;
        }
        if (b.stats.percent < a.stats.percent) {
            return -1;
        }
        return 0;
      });

      const processed = sortUsers(users, 'percent', 'DESC');
      
      assert.deepEqual(order, processed);        
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC', () => {
      const users = fixtures.users;
      
      const order = users.sort((a, b) => {
        if (a.stats.exercises.percent > b.stats.exercises.percent) {
          return 1;
        }
        if (a.stats.exercises.percent < b.stats.exercises.percent) {
            return -1;
        }
        return 0;
      });

      const processed = sortUsers(users, 'exercisesPercent5', 'ASC');
      
      assert.deepEqual(order, processed);  
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC'), () => {
      const users = fixtures.users;
      
      const order = users.sort((a, b) => {
        if (b.stats.exercises.percent > a.stats.exercises.percent) {
          return 1;
        }
        if (b.stats.exercises.percent < a.stats.exercises.percent) {
            return -1;
        }
        return 0;
      });

      const processed = sortUsers(users, 'exercisesPercent', 'DESC');
      
      assert.deepEqual(order, processed);
    };
    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC');
    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC');
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC');
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC');
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC');
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC');

  });

  describe('filterUsers(users, filterBy)', () => {

    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)');

  });

  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', () => {

    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter');

  });

});
